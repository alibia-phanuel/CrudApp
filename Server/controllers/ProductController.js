import Product from "../models/ProductModel.js";
import path from "path";
//system de fichier de node js
import fs from "fs";
//RECUPERE TOUT LES PRODUIT
export const getProducts = async (req, res) => {
  try {
    const response = await Product.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
//Fin getProduct
//RECUPERE UN PRODUIT EN FONCTION DE SON ID
export const getProductsById = async (req, res) => {
  try {
    const response = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
//Fin getProductsById

//SAUVEGARDE UN PRODUIT EN BASE DE DONNEE


// Fonction de validation de l'image
const validateImage = (file) => {
  const ext = path.extname(file.name);
  const fileSize = file.data.length;

  const allowedTypes = [".png", ".jpg", ".jpeg"];
  if (!allowedTypes.includes(ext.toLowerCase())) {
    return { isValid: false, errorMsg: "Images invalides" };
  }

  if (fileSize > 5000000) {
    return { isValid: false, errorMsg: "L'image doit faire moins de 5 Mo" };
  }

  return { isValid: true };
};

// --------------------SAVE PRODUCT----------------- /////
export const saveProduct = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ msg: "Aucun fichier téléchargé" });
    }

    const { title } = req.body;
    const file = req.files.file;

    const validationResult = validateImage(file);
    if (!validationResult.isValid) {
      return res.status(422).json({ msg: validationResult.errorMsg });
    }

    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;

    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    await file.mv(`./public/images/${fileName}`);

    await Product.create({ name: title, image: fileName, url });

    return res.status(201).json({ msg: "Produit créé avec succès" });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ msg: "Erreur lors de la création du produit" });
  }
};
//Fin saveProduct



// METS A JOUR UN PRODUIT PRODUIT
export const updteProduct = async (req, res) => {
  //recuprer le produit en fonction de son id
  const product = await Product.findOne({
    where: {
      id: req.params.id,
    },
  });
  //verifi la disponibiliter des donne
  if (!product) {
    return res.status(404).json({ msg: "No Data Found" });
  }

  let fileName = "";
  if (req.files === null) {
    fileName = product.image;
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedtype = [".png", ".jpg", ".jpeg"];

    if (!allowedtype.includes(ext.toLowerCase())) {
      return res.status(422).json({ msg: "Invalid Images" });
    }
    if (fileSize > 50000000) {
      return res.status(422).json({ msg: "Image must be less than 500Mb" });
    }
    const filePath = `./public/images/${product.image}`;
    fs.unlinkSync(filePath);

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) {
        return res.status(500).json({ msg: err.message });
      }
    });
  }

  const name = req.body.title;
  //url qui serra save dans la base de donner
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  try {
    await Product.update(
      { name: name, image: fileName, url: url },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Product update successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};























//SUPPRIME UN PRODUIT
export const deleteProduct = async (req, res) => {
  //recuprer le produit en fonction de son id
  const product = await Product.findOne({
    where: {
      id: req.params.id,
    },
  });
  //verifi la disponibiliter des donne
  if (!product) {
    return res.status(404).json({ msg: "No Data Found" });
  }
  //supression et gestion erreur
  try {
    const filePath = `./public/images/${product.image}`;
    fs.unlinkSync(filePath);
    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    //resulta de laction
    res.status(200).json({ msg: "Product Delete Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};
