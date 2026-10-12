import assert from 'node:assert/strict';
import test from 'node:test';
import {
    buildMediaUrl,
    buildSourceMediaUrl,
    formatSourceImageInfo,
    getSourceImageExtension
} from '../media-utils.mjs';

const mediaParts = {
    domain: 'media.adeo.com',
    source: 'media',
    mediaId: '3361466',
    mediaName: 'test',
    extension: 'jpg'
};

test('builds a source URL from DAM media details', () => {
    assert.equal(
        buildSourceMediaUrl(mediaParts),
        'https://media.adeo.com/media/3361466/test.jpg'
    );
});

test('uses placeholders when optional URL parts are empty', () => {
    assert.equal(
        buildSourceMediaUrl({ ...mediaParts, domain: ' ', mediaId: '', mediaName: '', extension: '' }),
        'https://[domain]/media/[id]/[name].[ext]'
    );
});

test('adds Fastly parameters and encodes their values', () => {
    const url = buildMediaUrl(mediaParts, [
        { key: 'width', manualKey: '', value: '800' },
        { key: 'custom', manualKey: 'my-param', value: 'a b&c' },
        { key: '', manualKey: '', value: 'ignored' }
    ]);

    assert.equal(
        url,
        'https://media.adeo.com/media/3361466/test.jpg?width=800&my-param=a%20b%26c'
    );
});

test('formats the original image dimensions and extension for display', () => {
    assert.equal(formatSourceImageInfo(7040, 4698, 'jpg'), '7040 × 4698 px · JPG');
});

test('normalizes extensions that include a leading dot', () => {
    assert.equal(getSourceImageExtension('.jpeg'), 'JPEG');
});