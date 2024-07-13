import { useContext, useEffect } from "react";
import styled from "styled-components";
import closeBtn from "./cerrar.png";
import FormInput from "../FormInput";
import OptionInput from "../OptionInput";
import ActionBtn from "../ActionBtn";
import { GlobalContext } from "../../context/Context";

const Overlay = styled.div`
  background-color: var(--shadow-color);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
`;

const DialogStyles = styled.dialog`
  position: absolute;
  top: 30px;
  width: 93%;
  z-index: 4;
  margin: 0 auto;
  border-radius: 15px;
  border: 5px solid #6bd1ff;
  padding: 60px 12px;
  background-color: var(--background-modal);

  @media (min-width: 1024px) {
    width: 70%;
    top: 50px;
    padding: 60px 140px;
  }
`;

const FormStyles = styled.form`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const TitleStyles = styled.legend`
  color: var(--main-color-blue);
  font-size: 3.2rem;
  font-weight: bold;
  text-transform: uppercase;

  @media (min-width: 1024px) {
    font-size: 6rem;
    align-self: flex-start;
  }
`;

const ButtonClose = styled.button`
  position: absolute;
  top: -44px;
  right: 4px;
  height: 52px;
  width: 52px;
  background: none;
  border: none;
  cursor: pointer;

  img {
    width: 100%;
  }

  @media (min-width: 1024px) {
    right: -125px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-evenly;
    width: 100%;
  }
`;

const Modal = ({ video, closeModal }) => {
  const {
    title,
    category,
    handleInputChange,
    updateVideoInfo,
    clearInputs,
  } = useContext(GlobalContext);

  useEffect(() => {
    const getInitialValue = () => {
      if (video) {
        handleInputChange("titulo", video.titulo || "");
        handleInputChange("categoria", video.categoria || "");
      }
    };

    getInitialValue();
  }, [video, handleInputChange]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let id = video.id;
    let info = {
      title,
      category,
      id,
    };

    updateVideoInfo(info);
    closeModal();
  };

  return (
    <>
      {video && (
        <>
          <Overlay />
          <DialogStyles open={!!video}>
            <FormStyles onSubmit={handleSubmit}>
              <ButtonClose type="button" onClick={closeModal}>
                <img src={closeBtn} alt="Cerrar" />
              </ButtonClose>
              <TitleStyles>Editar card:</TitleStyles>

              <FormInput
                inputValue={title}
                placeholder="Título del video"
                from="modal"
                name="titulo"
                minlength="3"
                title="Tiene que tener al menos 3 caracteres para ser válido"
              >
                Título
              </FormInput>
              <OptionInput
                inputValue={category}
                placeholder="Escoja una categoría"
                from="modal"
                name="categoria"
              >
                Categoría
              </OptionInput>
              
              <ButtonContainer>
                <ActionBtn type="submit" main>
                  Guardar
                </ActionBtn>
                <ActionBtn action={clearInputs} type="button">
                  Limpiar
                </ActionBtn>
              </ButtonContainer>
            </FormStyles>
          </DialogStyles>
        </>
      )}
    </>
  );
};

export default Modal;
