import styles from '@/styles/Home.module.css'
import { GetServerSideProps } from 'next';
import { useState } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Loader } from 'semantic-ui-react'

interface SearchCatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

interface IndexPageProps {
  initialCatImageUrl: string;
}

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

export default function Home({ initialCatImageUrl }: IndexPageProps) {
  // 状態変数を定義
  const [catImageUrl, setCatImageUrl] = useState(initialCatImageUrl);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const catImage = await fetchCatImage();
    setCatImageUrl(catImage.url)
    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <h1>猫画像アプリ</h1>
      {isLoading ? <Loader active size='huge' inline='centered' /> : <img src={catImageUrl} alt="猫さん" />}
      <button onClick={handleClick}>今日の猫さん</button>
    </div>
  );
};

// SSR(サーバサイドレンダリング) 初期表示でも、猫の画像が見えるように
export const getServerSideProps: GetServerSideProps<IndexPageProps> = async () => {
  const catImage = await fetchCatImage();
  return {
    props: {
      initialCatImageUrl: catImage.url,
    },
  };
};
