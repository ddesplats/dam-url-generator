export function buildSourceMediaUrl({ domain, source, mediaId, mediaName, extension }) {
    const normalizedDomain = domain.trim() || '[domain]';
    const normalizedMediaId = mediaId.trim() || '[id]';
    const normalizedMediaName = mediaName.trim() || '[name]';
    const normalizedExtension = extension.trim() || '[ext]';

    return `https://${normalizedDomain}/${source}/${normalizedMediaId}/${normalizedMediaName}.${normalizedExtension}`;
}

export function buildMediaUrl(mediaParts, params) {
    let url = buildSourceMediaUrl(mediaParts);
    const validParams = params.filter(param => param.key.trim() !== '' || (param.key === 'custom' && param.manualKey.trim() !== ''));

    if (validParams.length > 0) {
        const queryString = validParams
            .map(param => {
                const key = param.key === 'custom' ? param.manualKey : param.key;
                return `${encodeURIComponent(key)}=${encodeURIComponent(param.value)}`;
            })
            .join('&');
        url += `?${queryString}`;
    }

    return url;
}

export function getSourceImageExtension(extension) {
    return (extension.trim() || '[ext]').split('.').pop().toUpperCase();
}

export function formatSourceImageInfo(width, height, extension) {
    return `${width} × ${height} px · ${getSourceImageExtension(extension)}`;
}