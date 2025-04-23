export interface Traduccion{
  id_traduccion: number;
  id_referencia: number;
  idioma: string,
  texto: string
}

export interface Evento {
    fecha:             string;
    //fecha_de_creacion: string;
    id_evento:         number;
    //titulo_es:         string;
    //titulo_gl:         string;
    web:               string;
    ref_cadena_titulo: number;
    traduccion: Traduccion;
}
export interface Imagen {
    //alt_text_es:  string;
    //alt_text_gl:  string;
    id_imagen:    number;
    id_proyecto:  number;
    url:          string;
    //ruta:         string;
}
export interface Participacion {
    id_evento:    number;
    id_proyecto:  number;
    ref_cadena_resultado: number;
    traduccion: Traduccion;
//    resultado_es: string;
//    resultado_gl: string;
}
export interface Proyecto {
//    fecha_de_creacion: Date;
    id_autor:              number;
    id_proyecto:           number;
    ref_cadena_titulacion: number;
    ref_cadena_titulo:     number;
    ref_cadena_resumen:    number;
    resumen:               Traduccion;
    titulacion:            Traduccion;
    titulo:                Traduccion;
    poster:            string;
    video:             string;
    web:               string;
    ruc:               string;

    nombre:            string;
    apellido1:         string;
    apellido2:         string;
    imagen_autor:      string;

    eventos:           Evento[];
    imagenes:          Imagen[];
    participaciones:   Participacion[];
}

