import axios from "axios";
import React, { useEffect, useState } from "react";

const NEWS_API =
    "https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=ab853340eec74e9e9ac57e65e5d097ee";

function News() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        axios.get(NEWS_API).then((res) => {
            setNews(res.data.articles);
        });
    }, []);

    return (
        <div className="pt-5">
            <h1 className="text-4xl mb-6">News</h1>

            <div className="w-4/5 mx-auto">
                {news.map((item, index) => (
                    <a
                        key={index}
                        target="_blank"
                        href={item.url}
                        class="my-2 flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow flex-row hover:bg-gray-100 "
                    >
                        <img
                            class="object-cover w-full rounded-t-lg h-96 h-auto w-48  rounded-none  rounded-l-lg"
                            src={item.urlToImage}
                            alt=""
                        />
                        <div class="flex flex-col justify-between p-4 leading-normal">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                                {item.title}
                            </h5>
                            <p class="mb-3 font-normal text-gray-700 ">
                                {item.description}
                            </p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}

export default News;
