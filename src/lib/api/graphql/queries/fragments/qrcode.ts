import { graphql } from '#lib/api/graphql/graphql.ts';

export const QrCodeFragment = graphql(`
    fragment QrCode on QRCode {
        path
        viewbox
    }
`);
