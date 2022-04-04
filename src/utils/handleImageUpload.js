
async function handleImageUpload({ media, filename, labels }) {
    console.log('image', media)
    console.log('filename', filename)
    console.log('labels', labels)
    var myHeaders = new Headers();
    myHeaders.append("x-amz-meta-label", JSON.stringify(labels));
    myHeaders.append("Content-Type", `image/${filename.slice(filename.lastIndexOf('.') + 1)}`);

    let fr = new FileReader();
    fr.readAsArrayBuffer(media)
    var file = null;

    fr.onload = function () {
        file = new Uint8Array(fr.result);

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: file,
            redirect: 'follow'
        };

        fetch(`https://urmkm2ivv6.execute-api.us-east-1.amazonaws.com/dev/upload/smart-photo-album-storage/${filename}`, requestOptions)
            .then(response => window.location.reload())
            .catch(error => console.error(error));
    }

}

export default handleImageUpload;
