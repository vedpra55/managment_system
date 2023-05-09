import { useState } from "react";
import { toast } from "react-hot-toast";

const useApiHandler = () => {
  const [loading, setLoading] = useState(false);

  async function createItem(url, data) {
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status == 200) {
        toast.success("Action done sucessfully");
      }
      setLoading(false);
      const json = await response.json();
      return json;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.errorMessage);
      setLoading(false);
    }
  }

  async function updateItem(url, data) {
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status == 200) {
        toast.success("Action done sucessfully");
      }
      setLoading(false);
      const json = await response.json();
      return json;
    } catch (err) {
      console.log(err.response.data);
      toast.error(err.response.data.errorMessage);
      setLoading(false);
    }
  }

  async function deleteItem(url) {
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (response.status == 200) {
        toast.success("Action done sucessfully");
      }
      toast.success("Action done sucessfully");
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.errorMessage);
      setLoading(false);
    }
  }

  return { createItem, updateItem, deleteItem, loading };
};

export default useApiHandler;
