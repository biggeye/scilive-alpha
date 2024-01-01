"use client";

import React, { useState } from "react";
import { handleImageEditSubmit } from "@/lib/replicate/useImageEditSubmit";
import ImageCreateForm from "../replicate/ImageCreateForm";
import ImageEditForm from "../replicate/ImageEditForm";

const DynamicInput = ({
  userId,
  tool,
  selectedModel,
  userInFile,
  onImageChange,
  setPrediction,
  supabase,
  setNewPrediction,
}) => {

  const modelId = selectedModel ? selectedModel.modelId : null;



  return (
    <>
      {tool === "imageCreation" && (
        <ImageCreateForm modelId={modelId} supabase={supabase} userId={userId}/>
      )}
      {tool === "imageEditing" && (
        <ImageEditForm modelId={modelId} supabase={supabase} userId={userId}/>
      )}
    </>
  );
};

export default DynamicInput;
