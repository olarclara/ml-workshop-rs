# Recommender Systems

Terms: _items_, _relevance score_.

## 1. Why?

The human decision-making process is a topic of research and interest across various domains, a lot of work is put into discovering what drives us to consume goods.
There's an inherent belief that having choices is good, being able to choose what we buy makes us satisfied. However, when there are too many options, the process of making a choice becomes more difficult. This is called "choice overload".
A pretty mundane example is choosing a movie to watch. When going to the theather, there are 6 or 7 options, and choosing what to watch is simple. However, when booting Netflix and its ([reportedly](https://www.businessinsider.com/netflix-movie-catalog-size-has-gone-down-since-2010-2018-2)) more than 4000 movies, choosing what to watch seems almost impossible.
That's a very common feat of online platforms, from Amazon and its [12mi](https://www.bigcommerce.com/blog/amazon-statistics/) available products to Spotify's [50mi](https://en.wikipedia.org/wiki/Spotify) songs, we eventually need some help to make a decision.

## 2. Recommendations

Humans have always relied on recommendations to make choices, from best seller lists to friends advice, what we consume is always influenced by external factors. This couldn't be any different for online platforms and that's the motivation behind Recommendation Systems.

### 2.1 Recommendations Systems

The biggest difference of said systems is that they generally provided user-oriented personalized suggestions, whereas a most watched list is aimed at everyone. These systems have two major types of paradigms: content based and collaborative based.

- 2.1.1 Content based

This method relies on the similarity between items, the idea is that if you expressed interest in an item before, similar ones will be interesting too. Do not suffer from the cold start problem.

- 2.1.2 Collaborative based

In the other hand, collaborative filtering is a method that relies on the similarity of user's behaviour. The main idea if someone has similar taste, their preferences will be applicable recommendations to the user.

On both methods, the purpose remains the same: find similarities between items and give recommendations based on them. Knowing this, we can build recommender systems with a base computer science data structure: graphs.

## 3. Graph Theory

### 3.1 Djikstra

### 3.2 Real-word applications

#### 3.2.1 Pixie: by Pinterest

Resource: https://arxiv.org/pdf/1711.07601.pdf

#### 3.2.2 Neo4j

Resource: https://neo4j.com/use-cases/real-time-recommendation-engine/

## 4. Challenges and concerns

### 4.1 Dark patterns

Intentionally or not, recommender systems and their attempt to engage users, are ordinary social engineering. Recommender Systems often walk a thin line between freedom and coercion, making their ethics highly questionable. See more on the following paper: [Captivating algorithms: Recommender systems as traps](https://pdfs.semanticscholar.org/67aa/b5a586bd1b34666e33c505c28fdf38c0d6be.pdf)

### 4.2 Privacy

The more information a system has, more accurate the recommendations become, thus creating an inherent trade-off between utility and privacy. More information can be found on the following paper: http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.304.5839&rep=rep1&type=pdf
