/**
 * Cloudflare Pages Function: /api/upload
 * Maneja la subida segura de imágenes al bucket Cloudflare R2 ('iasdbele')
 * IASD Belén · Iglesia Adventista del Séptimo Día
 */

export async function onRequestPost(context) {
    const { request, env } = context;

    try {
        const contentType = request.headers.get('content-type') || '';
        if (!contentType.includes('multipart/form-data')) {
            return new Response(JSON.stringify({
                success: false,
                error: 'El formato de solicitud debe ser multipart/form-data'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
            });
        }

        const formData = await request.formData();
        const file = formData.get('file');

        if (!file || typeof file === 'string') {
            return new Response(JSON.stringify({
                success: false,
                error: 'No se ha seleccionado ningún archivo de imagen válido.'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
            });
        }

        // Validar tipo de imagen permitido
        const mime = (file.type || '').toLowerCase();
        const validMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'image/avif'];
        const isImage = mime.startsWith('image/') || validMimes.includes(mime);
        if (!isImage) {
            return new Response(JSON.stringify({
                success: false,
                error: 'El archivo seleccionado no es una imagen válida (JPG, PNG, WebP, GIF, SVG).'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
            });
        }

        // Validar tamaño máximo (5 MB)
        const MAX_SIZE = 5 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            return new Response(JSON.stringify({
                success: false,
                error: 'El tamaño de la imagen no puede superar los 5 MB.'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
            });
        }

        // Obtener el binding del bucket R2 configurado en Cloudflare Pages
        // Soporta 'iasdbele' (nombre del binding), o variantes en mayúsculas/minúsculas
        const bucket = env.iasdbele || env.IASDBELE || env.IASDBELEN || env.BUCKET;
        if (!bucket) {
            return new Response(JSON.stringify({
                success: false,
                error: 'El binding del bucket R2 (iasdbele) no está configurado en Cloudflare Pages.'
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
            });
        }

        // Generar nombre de archivo único y limpio
        const timestamp = Date.now();
        const rawName = file.name || 'imagen.jpg';
        const sanitized = rawName
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-zA-Z0-9._-]/g, '_')
            .toLowerCase();
        const key = `anuncios/${timestamp}-${sanitized}`;

        // Subir al bucket R2
        await bucket.put(key, file.stream(), {
            httpMetadata: {
                contentType: mime || 'image/jpeg'
            }
        });

        // URL pública
        const publicBase = (env.R2_PUBLIC_URL || 'https://pub-3f01c9b29e95478ea7fd063f9b33305f.r2.dev').replace(/\/+$/, '');
        const publicUrl = `${publicBase}/${key}`;

        return new Response(JSON.stringify({
            success: true,
            url: publicUrl,
            key: key
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });

    } catch (err) {
        return new Response(JSON.stringify({
            success: false,
            error: 'Error al subir imagen a R2: ' + (err.message || String(err))
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
    }
}

export async function onRequestOptions() {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    });
}
