import { graphql } from '$lib/api/graphql/graphql';

export const QrCodeFragment = graphql(`
    fragment QrCode on QRCode {
        path
        viewbox
    }
`);
