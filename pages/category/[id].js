// pages/category/[id].js
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Center from "@/components/Center";

export default function CategoryPage() {
    const router = useRouter();
    const { id } = router.query;
    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (id) {
            axios.get(`/api/categories?id=${id}`).then(response => {
                setCategory(response.data);
            });

            axios.get(`/api/products/by-category?categoryId=${id}`).then(response => {
                setProducts(response.data);
            });
        }
    }, [id]);

    return (
        <Center>
            {category && <h1>{category.name}</h1>}
            <div className="products-grid">
                {products.map(product => (
                    <div key={product._id} className="product-card">
                        <h2>{product.title}</h2>
                        <p>{product.description}</p>
                        <p>${product.price}</p>
                        <img src={product.images[0]} alt={product.title} />
                    </div>
                ))}
            </div>
        </Center>
    );
}
