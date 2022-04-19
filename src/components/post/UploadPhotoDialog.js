import React from "react";
// import { createEditor } from "slate";
// import { Slate, Editable, withReact } from "slate-react";
import { useAddPostDialogStyles } from "../../styles";
import {
    Dialog,
    AppBar,
    Toolbar,
    Typography,
    Button,
    Divider,
    Paper,
    Avatar,
    TextField,
    InputAdornment,
} from "@material-ui/core";
import { ArrowBackIos, PinDrop, Label } from "@material-ui/icons";
// import { UserContext } from "../../App";
// import serialize from "../../utils/serialize";
import handleImageUpload from "../../utils/handleImageUpload";
import { useHistory } from "react-router-dom";
// import TagIcon from '@mui/icons-material/Tag';
// import { useMutation } from "@apollo/react-hooks";
// import { CREATE_POST } from "../../graphql/mutations";

const initialValue = [
    {
        type: "paragraph",
        children: [{ text: "" }],
    },
];


function UploadPhotoDialog({ media, handleClose }) {
    const classes = useAddPostDialogStyles();
    // const { me, currentUserId } = React.useContext(UserContext);
    // const editor = React.useMemo(() => withReact(createEditor()), []);
    const [value, setValue] = React.useState(initialValue);
    const [location, setLocation] = React.useState("");
    const [submitting, setSubmitting] = React.useState(false);
    const [labels, setLabels] = React.useState([]);
    const [labelInput, setLabelInput] = React.useState('');
    const [filename, setFilename] = React.useState(media['name']);
    const history = useHistory();

    // const [createPost] = useMutation(CREATE_POST);


    async function handleUploadPhoto(e) {
        setSubmitting(true);
        const data = await handleImageUpload({ media, filename, labels });
        setSubmitting(false);
    }

    const handleAddLabel = (event) => {
        if (!labelInput.trim()) return;
        setLabels(prevLabels => {
            return [
                ...labels,
                labelInput.toLowerCase().trim()
            ]
        });
        setLabelInput('')
    }

    const handleDeleteLabel = (index) => {
        setLabels(prevLabels => {
            return prevLabels.filter((label, i) => i !== index)
        })
    }

    return (
        <Dialog fullScreen open onClose={handleClose}>
            <AppBar className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <ArrowBackIos onClick={handleClose} />
                    <Typography align="center" variant="body1" className={classes.title}>
                        New Upload
                    </Typography>
                    <Button
                        color="primary"
                        variant="contained"
                        // className={classes.share}
                        disabled={submitting}
                        onClick={handleUploadPhoto}
                    >
                        Confirm
                    </Button>
                    <Button
                        color="secondary"
                        variant="outlined"
                        // className={classes.share}
                        disabled={submitting}
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                </Toolbar>
            </AppBar>
            <Divider />
            <div className={classes.paper}>
                <img
                    src={URL.createObjectURL(media)}
                    className={classes.avatarLarge}
                    variant="square"
                />
            </div>
            <div className={classes.labelContainer}>
                <div className={classes.labelSection}>
                    <TextField
                        fullWidth
                        placeholder="Label"
                        value={filename}
                        InputProps={{
                            classes: {
                                root: classes.root,
                                input: classes.input,
                                underline: classes.underline,
                            },
                        }}
                        onChange={(event) => setFilename(event.target.value)}
                    />
                    <TextField
                        fullWidth
                        placeholder="Label"
                        value={labelInput}
                        InputProps={{
                            classes: {
                                root: classes.root,
                                input: classes.input,
                                underline: classes.underline,
                            },
                            startAdornment: (
                                <InputAdornment>
                                    <Label />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment>
                                    <Button variant="outlined" color="success" onClick={handleAddLabel}>
                                        Add
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                        onChange={(event) => setLabelInput(event.target.value)}
                    />
                    {labels && <div className={classes.labelWrapper}>{labels && (
                        labels.map((label, i) => (
                            <Button key={i} className={classes.label} onClick={() => handleDeleteLabel(i)}>{label}&nbsp;&nbsp;</Button>

                        ))
                    )}</div>}
                </div>
            </div>
        </Dialog>
    );
}

export default UploadPhotoDialog;
