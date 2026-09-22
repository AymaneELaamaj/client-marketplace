export const defaultCategoryForm = {
  name: "",
  description: "",
};

export const defaultProductForm = {
  name: "",
  description: "",
  price: "",
  stock: "0",
  category: "",
  imageUrl: "",
};

export const toProductForm = (product) => ({
  name: product.name || "",
  description: product.description || "",
  price: product.price?.toString() || "",
  stock: product.stock?.toString() || "0",
  category:
    typeof product.category === "object" ? product.category?._id || "" : product.category || "",
  imageUrl: product.imageUrl || "",
});

export const buildCategoryPayload = (form) => ({
  name: form.name.trim(),
  description: form.description.trim(),
});

export const buildProductPayload = (form) => {
  const payload = {
    name: form.name.trim(),
    description: form.description.trim(),
    price: Number(form.price),
    stock: Number(form.stock),
    category: form.category,
  };

  if (form.imageUrl.trim()) {
    payload.imageUrl = form.imageUrl.trim();
  }

  return payload;
};

export const getCategoryName = (category) => {
  if (!category) {
    return "Sans categorie";
  }

  return typeof category === "object" ? category.name : "Categorie";
};

export const isImportedImage = (value) => value.startsWith("data:image/");
