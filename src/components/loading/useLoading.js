import { useState } from "react";

export default function useLoading() {
  const [loading, showLoading] = useState(false);

  return {
    showLoading,
    loading,
  };
}
