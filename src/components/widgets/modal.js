import { useEffect, useRef } from "react";
import { Button, Card, Input, ModalContainer } from "../../styles"

const Modal = (props) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                props.onClose();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modalRef])

    return (
        <ModalContainer show={props.show || false}>
            <Card
                ref={modalRef}
                className="modal"
                style={{
                    padding: "24px 24px 29px 24px"
                }}
            >
                {props.children}
            </Card>
        </ModalContainer>
    )
}

export default Modal;