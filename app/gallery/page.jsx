"use client";
import React, { useEffect, useState } from "react";
import Card from "./card";
import Pagination from "./pagination";
import { createClient } from "@/utils/supabase/client";
import { getUserId, getMasterContent } from "@/utils/supabase/getUserId";

export default function Gallery() {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [deleteImageUrl, setDeleteImageUrl] = useState("");
  const [cards, setCards] = useState([]);
  const [userId, setUserId] = useState(null);
  const rowsPerPage = 6;

  const supabase = createClient();

  const fetchUserIdAndCards = async () => {
    try {
      const fetchedUserId = await getUserId(supabase);
      setUserId(fetchedUserId);
      const masterContent = await getMasterContent(supabase);
      setCards(masterContent);
      console.log("master_content: ", masterContent);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchUserIdAndCards();
  }, []);

  useEffect(() => {
    setTotal(Math.ceil(cards.length / rowsPerPage));
  }, [cards]);

  const startIndex = page * rowsPerPage;
  const selectedCards = cards.slice(startIndex, startIndex + rowsPerPage);

  return (
    <>
      <div className="gallery-container">
        {selectedCards.map((card, index) => (
          <div key={index} className="card-container">
            <Card
              imageUrl={card.url}
              created_at={card.created_at}
              prompt={card.prompt}
              id={card.content_id}
              isLoading={isLoading}
            />
          </div>
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={total}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </>
  );
}
