import { db } from '../firebase.js';
import {
    doc,
    getDoc,
    collection,
    query,
    where,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const filtrosConfig = {
  categoria: {
    container: 'filtro-genero',
    source: () => getDoc(doc(db, 'filtros', 'genero'))
  },
  idioma: {
    container: 'filtro-idioma',
    source: () => getDoc(doc(db, 'filtros', 'idioma'))
  },
  valor: {
    container: 'filtro-valor',
    source: () => getDoc(doc(db, 'filtros', 'valor'))
  },
  acabamento: {
    container: 'filtro-acabamento',
    source: () => getDoc(doc(db, 'filtros', 'acabamento'))
  },
  disponibilidade: {
    container: 'filtro-disponibilidade',
    source: () => getDoc(doc(db, 'filtros', 'disponibilidade'))
  }
};
