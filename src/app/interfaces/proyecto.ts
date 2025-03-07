export interface Evento {
    fecha:             string;
    fecha_de_creacion: string;
    id_evento:         number;
    titulo_es:         string;
    titulo_gl:         string;
    web:               string;
}
export interface Imagen {
    alt_text_es:  string;
    alt_text_gl:  string;
    id_imagen:    number;
    id_proyecto:  number;
    ruta:         string;
}
export interface Participacion {
    id_evento:    number;
    id_proyecto:  number;
    resultado_es: string;
    resultado_gl: string;
}
export interface Proyecto {
    fecha_de_creacion: Date;
    id_autor:          number;
    id_proyecto:       number;
    idioma:            string;
    resumen_es:        string;
    resumen_gl:        string;
    ruc:               string;
    titulo_es:         string;
    titulo_gl:         string;
    video:             string;
    web:               string;
    apellido1:         string;
    apellido2:         string;
    nombre:            string;
    imagen_autor:      string;
    eventos:           Evento[];
    imagenes:          Imagen[];
    participaciones:   Participacion[];
}
