import joblib
import pandas as pd

def recommend_books(group_favorite_book_ids):
    # Load the model and datasets
    knn_model = joblib.load('nearest_neighbors_model.pkl')
    dataset_combined = pd.read_csv('dataset_combined.csv')
    dataset = pd.read_csv('dataset.csv')

    # Extract the feature rows for these book IDs
    group_favorite_books = dataset_combined[dataset_combined['goodreads_book_id'].isin(group_favorite_book_ids)]

    features_to_average = group_favorite_books.drop(columns=['goodreads_book_id','title'])
    average_features = features_to_average.mean(axis=0).values.reshape(1, -1)  # Average feature vecto

    # Find nearest neighbors for the aggregated feature vector
    distances, indices = knn_model.kneighbors(average_features)

    # Retrieve recommended books based on indices
    recommended_books = dataset_combined.iloc[indices[0]]
    print(recommend_books)

    # Map to original dataset for titles and other details
    recommended_books_with_details = dataset[dataset['goodreads_book_id'].isin(recommended_books['goodreads_book_id'])]

    # Return the recommended books with relevant details
    return recommended_books_with_details[['goodreads_book_id', 'title', 'genres', 'authors', 'average_rating']]

# Example usage
group_favorite_book_ids = [117, 249, 424, 597, 629]
recommended_books = recommend_books(group_favorite_book_ids)
print("Recommended books based on the group's preferences:")
print(recommended_books)
