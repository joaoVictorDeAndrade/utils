const blobTypeMapper = (fileType) => {
    const blobMapper = {
        text: 'text/plain',
        jpeg: 'image/jpeg',
        png: 'image/png',
        pdf: 'application/pdf',
        json: 'application/json',
        xml: 'application/xml'
    };

    return blobMapper[fileType];
};

export const convertBase64ToAnyFile = (
    base64,
    fileName = 'download.pdf',
    fileType = 'pdf'
) => {
    const binaryData = atob(base64);

    const array = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
        array[i] = binaryData.charCodeAt(i);
    }

    const blobType = blobTypeMapper(fileType);
    const blob = new Blob([array], { type: blobType });
    const blobURL = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobURL;
    link.download = fileName;
    link.click();

    URL.revokeObjectURL(link.href);
};

export const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    );
};

export const formatCEP = (cep, dot = true, dash = true) => {
    if (!cep) return null;

    cep = cep.toString();

    if (cep.length !== 8) return cep;

    if (dot && dash) {
        cep = cep.substring(0, 2) + '.' + cep.substring(2);
        cep = cep.substring(0, 6) + '-' + cep.substring(6);
    }

    if (dot && !dash) cep = cep.substring(0, 2) + '.' + cep.substring(2);

    if (dash && !dot) cep = cep.substring(0, 5) + '-' + cep.substring(5);

    return cep;
};

export const formatPhone = (phone) => {
    if (!phone) return '';

    phone = phone.replace(/\D/g, '');

    if (phone.length === 11)
        phone = phone.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2$3-$4');

    if (phone.length === 10)
        phone = phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');

    return phone;
};

export const maskCalendar = (date) => {
    date = date.replace(/\D/g, '').substring(0, 8);

    date = date.replace(/(\d{2})(\d)/, '$1/$2');
    date = date.replace(/(\d{2})(\d)/, '$1/$2');

    return date;
};