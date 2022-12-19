const express = require("express");

const app = express();
let productos = [
  { id: 1, name: "teclado", price: 300 },
  { id: 2, name: "mouse", price: 30 },
  { id: 3, name: "Pantalla", price: 400 },
];
function productoExist(id) {
  return productos.find((p) => p.id == id);
}
app.use(express.json());
//app.use(productoExist());
app.get("/", (req, res) => {
  res.send(
    "<h2>Bienvenido a esta mini Crud API, que funciona con un array</h2>"
  );
});
// obtener todos los productos
app.get("/products", (req, res) => {
  res.json(productos);
});
// obtener un producto
app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const producto = productoExist(id);
  if (!producto) {
    res.statusCode = 404;
    return res.send(`ID ${id} no existe`);
  }

  res.json(producto);
});
//adicionar producto
app.post("/products", (req, res) => {
  const { name, price } = req.body;
  if (name && price) {
    const newProdruct = { id: productos.length + 1, ...req.body };
    productos.push(newProdruct);

    res.json(newProdruct).status(201);
  } else {
    res
      .json({
        message:
          "No se pudo adicionar Producto, formato invalido, falta algun dato",
      })
      .status(400);
  }
});
//actualizar productos
app.put("/products/:id", (req, res) => {
  const { id, name, price } = req.body;
  console.log(id, name, price);
  const oldProduct = productoExist(id);
  console.log(oldProduct);
  if (oldProduct && id && name && price) {
    productos[productos.indexOf(oldProduct)] = req.body;
    res.json(req.body).status(201);
  } else {
    res.json({ message: "No se pudo actualizar" }).status(400);
  }
});

//eliminar producto
app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  productos = productos.filter((p) => p.id != id);
  res.json(productos);
});
app.listen(3000, () => console.log("Server on Port 3000"));
