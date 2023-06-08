import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

interface SearchCatImage {
  id: string;
  url: string;
  width: number;
  heidht: number;
}

export default function Home() {
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
  };


  return (
    <div className={styles.container}>
      <h1>猫画像アプリ</h1>
      <img src="https://cdn2.thecatapi.com/images/2k4.jpg" alt="猫さん" />
      <button onClick={handleClick}>今日の猫さん</button>
    </div>
  );
};
