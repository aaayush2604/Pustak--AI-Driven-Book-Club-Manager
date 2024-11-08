import pandas as pd

df1 = pd.read_csv('book_tags.csv')
df2 = pd.read_csv('books.csv')
df3 = pd.read_csv('tags.csv')

merged_df = pd.merge(df1, df3, on='tag_id')

final_merged_df = pd.merge(merged_df, df2, on='goodreads_book_id')

dataset = final_merged_df.groupby(['goodreads_book_id','title'])[['tag_name','authors','average_rating']].agg(list).reset_index()

def remove_duplicates(genre_list):
    if isinstance(genre_list, list):
        unique_genres = list(dict.fromkeys(genre_list))
        return unique_genres
    else:
        return genre_list
    
dataset['authors']=dataset['authors'].apply(remove_duplicates)
dataset['tag_name']=dataset['tag_name'].apply(remove_duplicates)
dataset['average_rating']=dataset['average_rating'].apply(remove_duplicates)

book_genres = [
    'action',
    'adventure',
    'biography',
    'children',
    'classic',
    'comedy',
    'crime',
    'dystopian',
    'fantasy',
    'historical',
    'horror',
    'mystery',
    'non-fiction',
    'philosophy',
    'poetry',
    'romance',
    'science-fiction',
    'self-help',
    'thriller',
    'travel',
    'young-adult',
    'anthology',
    'cookbook',
    'graphic-novel',
    'memoir',
    'literary-fiction',
    'humor',
    'suspense',
    'religion',
    'spirituality',
    'science',
    'urban-fantasy',
    'magical-realism',
    'science-fantasy',
    'epic',
    'historical-romance',
    'contemporary',
    'paranormal',
    'western',
    'gothic',
    'adventure-romance',
    'cyberpunk',
    'steampunk',
    'literary-criticism',
    'business',
    'politics',
    'economics',
    'health',
    'psychology',
    'sociology',
    'true-crime',
    'war',
    'sports',
    'family',
    'drama',
    'historical-fiction',
    'alternative-history',
    'dark-fantasy',
    'light-novel',
    'legal-thriller',
    'medical-thriller',
    'military',
    'political-thriller',
    'historical-adventure',
    'cozy-mystery',
    'psychological-thriller',
    'climate-fiction',
    'biographical-fiction',
    'conspiracy',
    'new-adult',
    'speculative-fiction',
    'slipstream',
    'young-adult-fantasy',
    'urban-fiction',
    'adult-fiction',
    'young-adult-fiction',
    'classic-literature',
    'epistolary',
    'flash-fiction',
    'literary-fantasy',
    'historical-detective',
    'detective-fiction',
    'mythology',
    'folklore',
    'gothic-horror',
    'manga',
    'ya-fantasy',
    'ya-romance',
    'ya-sci-fi',
    'ya-thriller',
    'ya-horror',
    'paranormal-romance',
    'psychological-fiction',
    'crime-thriller',
    'courtroom-drama',
    'suspense-thriller',
    'romantic-suspense',
    'romantic-comedy',
    'adventure-fantasy',
    'fairy-tale',
    'dystopian-romance',
    'futuristic-fiction'
]
def filter_genres(genre_list):
    return [genre for genre in genre_list if genre in book_genres]

dataset['tag_name'] = dataset['tag_name'].apply(filter_genres)
dataset = dataset.rename(columns={'tag_name': 'genres'})
dataset.to_csv('dataset.csv',index=False)


