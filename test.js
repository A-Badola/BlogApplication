const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')

mongoose.connect('mongodb://localhost/my_database',{useNewUrlParser: true});

BlogPost.create({
  title: 'The Mythbuster’s Guide to Saving Money on Energy Bills',
  body: 'If you have been here a long time, you might remember when I went on ITV Tonight todispense a masterclass in saving money on energy bills. Energy-saving is one of my favourite moneytopics, because once you get past the boring bullet-point lists, a whole new world of thrifty nerderyopens up. You know those bullet-point lists. You start spotting them everything at this time of year.They go like this:'
},(error,blogpost)=>{
  console.log(error,blogpost)
})

BlogPost.create({
  title: 'Covid 19 Pandemic',
  body: 'Coronavirus 1st Wave was dangerous. Coronavirus 2nd wave was more dangerous/ deadly.'
},(error,blogpost)=>{
  console.log(error,blogpost)
})


