import { Modal } from "@mantine/core";
import axios from "axios";
import { useContext } from "react";
import { ACTIONS } from "../../lib/reducers/actions";
import { FormContext } from "../../lib/useContext/formContext";
import { MyButton } from "../../lib/partials/MyButton";
import Router from "next/router";

const Delete = ({ newId }: any) => {

    const { state, dispatch } = useContext(FormContext)

    const onDelete = async () => {
        await axios.delete(`http://127.0.0.1:3333/delete/${state.deleteId}`)
        dispatch({
            type: ACTIONS.CLOSE_DELETE
        })
        Router.push("/")
    }
    return (
        <div>
            <Modal
                opened={state.openDelete}
                onClose={() => dispatch({
                    type: ACTIONS.CLOSE_DELETE,
                })}
            >
                {/* Modal content */}
                <MyButton type='button' label="delete" onClick={(e: any) => {
                    onDelete()
                }} />
            </Modal>

        </div>
    )
}

export default Delete