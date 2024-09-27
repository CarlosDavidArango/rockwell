import React from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';

export default function ModalConfirm({isOpen, setIsOpen, handleReturn}) {

    const handleClose = () => setIsOpen(false);
    return(
        <Modal
            keepMounted
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={{ position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    borderRadius: 2,
                    p: 4 }}>
            <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                Confirm
            </Typography>
            <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                Are you sure you want to cancel the form?
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2, display:"flex"}}>
                <Button
                type="submit"
                variant="contained"
                onClick={handleReturn}
                >
                    Confirmar
                </Button>
                <Button
                type="submit"
                variant="contained"
                color="error"
                onClick={handleClose}
                >
                    Cancelar
                </Button>
            </Grid>
            </Box>
        </Modal>
    )

}