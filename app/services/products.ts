import type { CarProduct } from "~/types/product";

export const VITE_URL = import.meta.env.VITE_URL ?? (typeof window !== "undefined" ? window.location.origin : "http://localhost");
const TOKEN_KEY = "token";

export async function fetchAllProducts(): Promise<CarProduct[]> {

  const token = localStorage.getItem(TOKEN_KEY);

  try {
    const response = await fetch(`${VITE_URL}/api/veiculos`,
      {method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
      
    );

    console.log(response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {

    console.error("Erro ao buscar produtos:", error);

    return [];
  }
}

export async function fetchProductById(id: string): Promise<CarProduct | null> {

  const token = localStorage.getItem(TOKEN_KEY);
  try {
    const response = await fetch(`${VITE_URL}/api/veiculos/${id}`,
      
      {method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }

      }
    );
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erro ao buscar produto ${id}:`, error);
    return null;
  }
}
