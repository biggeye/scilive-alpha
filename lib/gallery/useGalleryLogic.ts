import React from "react";
import { useCallback } from "react";
import { useRecoilState } from "recoil";
import {
  currentGroupState,
  currentIndexState,
  contentItemsState
} from "@/state/user/gallery-atoms";
import {
  userImageUploadState,
  userImagePreviewState,
  userImageDataUriState,
} from "@/state/replicate/prediction-atoms";

import { handleGalleryEditSelection } from "../replicate/handleGalleryEditSelection";

// Import necessary atoms and other hooks

const useGalleryLogic = () => {
  const [currentGroup, setCurrentGroup] = useRecoilState(currentGroupState);
  const [currentIndex, setCurrentIndex] = useRecoilState(currentIndexState);
  const [contentItems, setContentItems] = useRecoilState(contentItemsState);
  const [userImageUpload, setUserImageUpload] =
    useRecoilState(userImageUploadState);




  const goToNextGroup = () => {
    if (currentGroup !== null && currentGroup < contentItems.length - 1) {
      setCurrentGroup(currentGroup + 1);
    }
  };

  const goToPreviousGroup = () => {
    if (currentGroup !== null && currentGroup > 0) {
      setCurrentGroup(currentGroup - 1);
    }
  };

  const onEdit = useCallback(async (imageUrl: string) => {
    const result = await handleGalleryEditSelection(imageUrl);
    if (result) {
      setUserImageUpload(result.file);
      setUserImagePreview(result.imagePreview);
      setUserImageDataUri(result.URI);
    }
  }, []);

  const onDelete = async (content_id: string) => {
    openDeleteConfirmModal(content_id);
  };

  const onSetProfile = async (url: string) => {
    setCurrentUserAvatarUrl(url);
    await supabase.from("users").update({ avatar_url: url }).eq({ id: userId });
  };

  const openDeleteConfirmModal = (content_id: string) => {
    setDeletingContent_id(content_id);
    setIsDeleteConfirmOpen(true);
  };

  const closeDeleteConfirmModal = () => {
    setIsDeleteConfirmOpen(false);
    setDeletingContent_id(null);
  };

  const confirmDeleteItem = async () => { 
    if (deletingContent_id) {
      await handleDelete(deletingContent_id);
      closeDeleteConfirmModal();
      refresh();
    }
  };
};
return {
  handleDelete: onDelete,
  handleEdit: onEdit,
  handleSetProfile: onSetProfile,
  // Export other handlers and state variables as needed
};
}

export default useGalleryLogic;
