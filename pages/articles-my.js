import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

import {
  nftmarketaddress, nftaddress
} from '../config'

let ethAccount
export default function MyAssets() {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  const router = useRouter()

  if (router.pathname == '/articles-my') {
    if (typeof document !== 'undefined') {
      var els = document.getElementsByClassName("_nav");
      Array.prototype.forEach.call(els, function(el) {
          el.classList.remove('current');
      });
      document.getElementById("_articles_my").classList.add('current');
    }
  }
  if (typeof window !== 'undefined') {
      ethAccount = localStorage.getItem("ethAccount");
  }

  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs() {
    const dweb_search_url = `https://dweb-search-api.anwen.cc/get_meta?eth=${ethAccount}`
    console.log(dweb_search_url)
    const ret = await axios.get(dweb_search_url) // TODO
    console.log(ret);
    if ("data" in ret.data){
      setNfts(ret.data.data)
    }
    setLoadingState('loaded')
  }
  if (loadingState === 'loaded' && !nfts.length) return (
    <h1 className="py-10 px-20 text-3xl">0 creations</h1>
  )

  return (
    <div className="flex justify-center">
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
            nfts.map((nft, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                <img src={nft.image} className="rounded" />
                <div className="p-4">
                  <a href={"/article?cid="+nft.path} >
                  <p style={{ height: '64px' }} className="text-2xl font-semibold">{nft.name}</p>
                  </a>
                  <p className="text-2xl font-semibold">By: 
                  <a href={"/articles?author="+nft.eth} >{nft.authors}</a>
                  </p>
                </div>
              </div>

            ))
          }
        </div>
      </div>
    </div>
  )
}