const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const PORT = 8080;

const contenedor = require('./Contenedor.js')
const container = new contenedor('products.txt')

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', (error) => console.log(`Error en servidor ${error}`));
app.use('/public', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//configuracion del motor 
app.set('view engine', 'hbs');  //hbs significa handlebars
app.set('views', './views');  //donde guardo el html 'las vistas '
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
  })
); //configuro el motor con la funcion engine el motor handlebars 


// fin de la configuracion del motor 

app.get('/products', async (req, res) => {
  //sirve productslist.hbs en index.hbs (index.hbs es la plantilla por defecto donde arranca todo)
  const products = await container.getAll()
  if (products) {
    res.render('productslist', { products: products, productsExist: true });
  } else{
    res.render('emptyList')
  }
  
  
});

app.get('products/:id', (req, res) => {

  let {id} = req.params;
  try {
    let found = productsHC.find( e => e.id == id)
    res.render('oneProduct',{ product:found, title:'producto seleccionado'})
  } catch (error) {
    console.log(error)
  }
  res.render('productslist', { products: productsHC, productsExist: true });
  
});

app.get('/form', (req, res) => {
  //sirve productslist.hbs en index.hbs (index.hbs es la plantilla por defecto donde arranca todo)
  res.render('formulario');
  
});

app.post('/products', async (req,res)=>{
  let {body} = req;

  const saveProducts = await container.save(body)
  res.redirect('/products')
})

