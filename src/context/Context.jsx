import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });
  const [errorMessages, setErrorMessages] = useState({});
  const [formFields, setFormFields] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Cargar videos desde la API
  useEffect(() => {
    fetch("https://my-json-server.typicode.com/IlledNacu/videos-prueba/videos")
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
        // Extraer categorías únicas de los videos disponibles
        const uniqueCategories = [...new Set(data.map((video) => video.categoria))];
        setCategories(uniqueCategories);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
        // No se maneja específicamente el error de carga de videos aquí
      });
  }, []);

  // Cargar categorías desde la API
  useEffect(() => {
    fetch("https://my-json-server.typicode.com/IlledNacu/videos-prueba/categorias")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        // No se maneja específicamente el error de carga de categorías aquí
      });
  }, []);

  const deleteVideo = (id) => {
    fetch(`https://my-json-server.typicode.com/IlledNacu/videos-prueba/videos/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al eliminar el video");
        }
        return res.json();
      })
      .then(() => {
        const newVideos = videos.filter((video) => video.id !== id);
        setVideos(newVideos);
        setPopup({
          show: true,
          message: "Video eliminado con éxito",
          type: "success",
        });
        setTimeout(() => {
          setPopup({ show: false, message: "", type: "" });
        }, 3000);
      })
      .catch((error) => {
        console.error("Error: ", error);
        setPopup({
          show: true,
          message: `Hubo un problema al eliminar el video: ${error}`,
          type: "error",
        });
        setTimeout(() => {
          setPopup({ show: false, message: "", type: "" });
        }, 3000);
      });
  };

  const updateVideoInfo = (data) => {
    const { title, category, image, videoLink, id } = data;
    const updatedVideo = {
      titulo: title,
      categoria: category,
      capa: image,
      link: videoLink,
    };

    fetch(`https://my-json-server.typicode.com/IlledNacu/videos-prueba/videos/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedVideo),
    })
      .then((res) => res.json())
      .then((updatedVideoFromServer) => {
        const updatedVideos = videos.map((video) =>
          video.id === id ? updatedVideoFromServer : video
        );
        setVideos(updatedVideos);
        setPopup({
          show: true,
          message: "Video actualizado con éxito",
          type: "success",
        });
        setTimeout(() => {
          setPopup({ show: false, message: "", type: "" });
        }, 3000);
      })
      .catch((error) => {
        console.error("Error: ", error);
        setPopup({
          show: true,
          message: `Hubo un problema al actualizar el video: ${error}`,
          type: "error",
        });
        setTimeout(() => {
          setPopup({ show: false, message: "", type: "" });
        }, 3000);
      });
  };

  const createNewVideo = (data) => {
    const { category, image, videoLink, title } = data;
    const newVideo = {
      categoria: category,
      capa: image,
      link: videoLink,
      titulo: title,
      id: videos.length + 1, // Asumiendo que los ids son consecutivos
    };

    fetch("https://my-json-server.typicode.com/IlledNacu/videos-prueba/videos", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newVideo),
    })
      .then((res) => res.json())
      .then((createdVideo) => {
        setVideos([...videos, createdVideo]);
        setPopup({
          show: true,
          message: `Se ha agregado con éxito el video: ${createdVideo.titulo}`,
          type: "success",
        });
        setTimeout(() => {
          setPopup({ show: false, message: "", type: "" });
        }, 3000);
      })
      .catch((error) => {
        console.error("Error: ", error);
        setPopup({
          show: true,
          message: `Hubo un problema al agregar el video: ${error}`,
          type: "error",
        });
        setTimeout(() => {
          setPopup({ show: false, message: "", type: "" });
        }, 3000);
      });
  };

  const clearInputs = () => {
    setTitle("");
    setCategory("");
    setImage("");
    setVideoLink("");
    setIsFormValid(false);
  };

  const handleInputChange = (name, value) => {
    switch (name) {
      case "titulo":
        setTitle(value);
        break;
      case "categoria":
        setCategory(value);
        break;
      case "imagen":
        setImage(value);
        break;
      case "video":
        setVideoLink(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const allValid = Object.values(formFields).every((field) => field.validity.valid);
    setIsFormValid(allValid);
  }, [formFields]);

  const verifyField = (field) => {
    let message = "";
    field.setCustomValidity("");

    // Aquí podrías agregar validaciones personalizadas si es necesario en el futuro
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      [field.name]: message,
    }));
  };

  return (
    <GlobalContext.Provider
      value={{
        title,
        image,
        category,
        videoLink,
        videos,
        categories,
        selectedVideo,
        popup,
        errorMessages,
        isFormValid,
        handleInputChange,
        setSelectedVideo,
        setCategory,
        deleteVideo,
        updateVideoInfo,
        createNewVideo,
        clearInputs,
        verifyField,
        setErrorMessages,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
