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
    return res.status(404).send(`ID ${id} no existe`);
  }

  res.json(producto);
});
//adicionar producto
app.post("/products", (req, res) => {
  const { name, price } = req.body;
  if (name && price) {
    const newProdruct = { id: productos.length + 1, ...req.body };
    productos.push(newProdruct);

    res.status(201).json(newProdruct);
  } else {
    res.status(400).json({
      message:
        "No se pudo adicionar Producto, formato invalido, falta algun dato",
    });
  }
});
//actualizar productos
app.put("/products/:id", (req, res) => {
  const { id } = req.params;

  const oldProduct = productoExist(id);
  console.log(oldProduct);
  if (oldProduct) {
    //productos[productos.indexOf(oldProduct)] = req.body;
    //asi se puede actualizar solo los campos que mudaron en la otra version
    //eran todos actualizados
    productos = productos.map((p) => (p.id == id ? { ...p, ...req.body } : p));
    res.status(200).json({ id, ...req.body });
  } else {
    res.status(400).json({ message: "No se pudo actualizar" });
  }
});

//eliminar producto
app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  productos = productos.filter((p) => p.id != id);
  res.json(productos);
});
app.listen(3000, () => console.log("Server on Port 3000"));
