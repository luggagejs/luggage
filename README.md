# Luggage.js

Dropbox file API wrapper for storing json data.

> Have you ever noticed that their stuff is shit and your shit is stuff?
(George Carlin)

### Usage

```
var client = new Dropbox.Client({ key: DROPBOX_APP_KEY });
var store = new Luggage(client);
var articles = store.collection('articles');

/* Client needs to be authenticated before we make any data request */
client.authenticate({ interactive: false }, (error) => {
  if (error) { return console.error('Authentication error: ' + error); }

  articles.read().then((articles) => {
    console.log(articles);
  });
});

/* Listen to data updates */
articles.on('data', (articles) => {
  console.log('Data arrived', articles);
});
```

### Filtering

```
articles.where({ author: 'John Doe' }).read().then((articles) => {
  console.log('John\'s articles:', articles);
});

/* or you can provide a function */
articles.where(article => article.authors.includes('John Doe')).read().then((articles) => {
  console.log('John\'s articles:', articles);
});

/* Listen to filtered data updates */
articles.where({ author: 'John Doe' }).on('data', (articles) => {
  console.log('John\'s articles:', articles);
});

/* You can stack conditions */
articles.where({ author: 'John Doe' }).where(article => article.comments > 0)

/* or more readable */
articles.where({ author: 'John Doe' }).and(article => article.comments > 0)

```

### Finding single record

```
/* Collection#find returns the first record found */
articles.find({ author: 'John Doe' }).read().then((article) => {
  console.log('John\'s article:', article);
});

/* Collection#find takes a function */
articles.find(article => article.author === 'John Doe').read().then((article) => {
  console.log('John\'s article:', article);
});

/* Listen to single record updates */
articles.find({ author: 'John Doe' }).on('data', (article) => {
  console.log('John\'s article:', article);
});
```

### Updating record

```
/* Simple merge with existing record */
articles.find({ id: 1 }).update({ author: 'Jane Doe' }).then(([article]) => {
  console.log('Author changed:', article.author);
});

/* Record#update takes a function (surprise :)) */
articles.find(article => article.id === 42).update((article) => {
  article.authors.push('Jane Doe');
  return article;           // Do not forget to return new record
})
```

### Adding new record

```
articles.add({ author: 'John Doe', body: 'Blah blah blah mr. Freeman' }).then((article) => {
  console.log('New article was added:', article);
});
```

### Deleting record

```
articles.find({ id: 1 }).delete().then((article) => {
  console.log('No longer within collection:', article);
});

```
