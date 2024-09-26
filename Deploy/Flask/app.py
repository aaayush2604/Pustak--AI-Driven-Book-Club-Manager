from flask import Flask, request, jsonify, render_template
import joblib
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the datasets once at the start
dataset_combined = pd.read_csv('dataset_combined.csv')
dataset = pd.read_csv('dataset.csv')

@app.route('/')
def index():
    return render_template('index.html')

def recommend_books(group_favorite_book_ids):
    # Load the model
    knn_model = joblib.load('nearest_neighbors_model.pkl')

    # Extract the feature rows for these book IDs
    group_favorite_books = dataset_combined[dataset_combined['goodreads_book_id'].isin(group_favorite_book_ids)]

    features_to_average = group_favorite_books.drop(columns=['goodreads_book_id', 'title'])
    average_features = features_to_average.mean(axis=0).values.reshape(1, -1)

    # Find nearest neighbors for the aggregated feature vector
    distances, indices = knn_model.kneighbors(average_features)

    # Retrieve recommended books based on indices
    recommended_books = dataset_combined.iloc[indices[0]]

    # Map to original dataset for titles and other details
    recommended_books_with_details = dataset[dataset['goodreads_book_id'].isin(recommended_books['goodreads_book_id'])]

    return recommended_books_with_details[['goodreads_book_id', 'title', 'genres', 'authors', 'average_rating']]

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    group_favorite_book_ids = data.get('favorite_book_ids', [])
    print(group_favorite_book_ids)
    group_favorite_book_ids = [int(book_id) for book_id in group_favorite_book_ids]
    print(group_favorite_book_ids)

    if not group_favorite_book_ids:
        return jsonify({'error': 'No book IDs provided.'}), 400

    recommended_books = recommend_books(group_favorite_book_ids)
    return jsonify(recommended_books.to_dict(orient='records'))

@app.route('/search')
def search():
    query = request.args.get('query', '').lower()

    # If the query is empty, return a message
    if not query:
        return jsonify({"error": "Query parameter is missing or empty"}), 400

    # Filter the dataset for titles that contain the query string
    suggestions = dataset[dataset['title'].str.contains(query, case=False, na=False)][['goodreads_book_id', 'title']]

    # Optionally limit the number of results returned (e.g., top 10 suggestions)
    suggestions_list = suggestions.head(10).to_dict(orient='records')

    return jsonify(suggestions_list)

if __name__ == '__main__':
    app.run(debug=True)

