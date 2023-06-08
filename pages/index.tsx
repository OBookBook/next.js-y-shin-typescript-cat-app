import styles from '@/styles/Home.module.css'
import { useState } from 'react'

interface SearchCatImage {
  id: string;
  url: string;
  width: number;
  heidht: number;
}

export default function Home() {
  // 状態変数を定義
  const [catImageUrl, setCatImageUrl] = useState("");

  const fetchCatImage = async (): Promise<SearchCatImage> => {
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    const result = await res.json();
    // console.log(result);
    /*
      {
        "id": "5r7",
        "url": "https://cdn2.thecatapi.com/images/5r7.jpg",
        "width": 600,
        "height": 451
      }
    */
    return result[0];
  };

  const handleClick = async () => {
    const catImage = await fetchCatImage();
    setCatImageUrl(catImage.url)
  };


  return (
    <div className={styles.container}>
      <h1>猫画像アプリ</h1>
      <img src={catImageUrl} alt="猫さん" />
      <button onClick={handleClick}>今日の猫さん</button>
    </div>
  );
};
