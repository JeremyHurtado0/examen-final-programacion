import Turismo from '../models/turismo_model.js';
import mongoose from 'mongoose';

export const getAllTurismos = async (req, res) => {
  try {
    const tours = await Turismo.find({}, { __v: 0 });
    if (tours.length === 0) {
      console.log(' No hay registros de turismo');
      return res.status(404).json({ msg: 'No hay registros de turismo' });
    }
    console.log(` Se obtuvieron ${tours.length} registros de turismo`);
    res.status(200).json(tours);
  } catch (error) {
    console.error(' Error al obtener los datos:', error);
    res.status(500).json({ msg: 'Error al obtener los datos', error });
  }
};

export const getTurismoById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log(' ID inválido recibido');
    return res.status(400).json({ msg: 'ID inválido' });
  }
  try {
    const tour = await Turismo.findById(id);
    if (!tour) {
      console.log(` No se encontró el registro con ID: ${id}`);
      return res.status(404).json({ msg: 'No encontrado' });
    }
    console.log(` Se obtuvo el registro con ID: ${id}`);
    res.status(200).json(tour);
  } catch (error) {
    console.error(' Error al buscar el registro:', error);
    res.status(500).json({ msg: 'Error al buscar el registro', error });
  }
};

export const postTurismo = async (req, res) => {
  try {
    const nuevo = new Turismo(req.body);
    await nuevo.save();
    console.log('Nuevo registro de turismo creado correctamente');
    res.status(201).json({ msg: 'Registro creado correctamente', nuevo });
  } catch (error) {
    console.error('Error al crear el registro:', error);
    res.status(500).json({ msg: 'Error al crear el registro', error });
  }
};

export const putTurismo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log(' ID inválido recibido');
    return res.status(400).json({ msg: 'ID inválido' });
  }
  try {
    const actualizado = await Turismo.findByIdAndUpdate(id, req.body, { new: true });
    if (!actualizado) {
      console.log(`No se encontró el registro con ID: ${id}`);
      return res.status(404).json({ msg: 'No encontrado' });
    }
    console.log(`Registro con ID ${id} actualizado correctamente`);
    res.status(200).json({ msg: 'Actualizado correctamente', actualizado });
  } catch (error) {
    console.error(' Error al actualizar:', error);
    res.status(500).json({ msg: 'Error al actualizar', error });
  }
};

export const deleteTurismo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log(' ID inválido recibido');
    return res.status(400).json({ msg: 'ID inválido' });
  }
  try {
    const eliminado = await Turismo.findByIdAndDelete(id);
    if (!eliminado) {
      console.log(` No se encontró el registro con ID: ${id}`);
      return res.status(404).json({ msg: 'No encontrado' });
    }
    console.log(`Registro con ID ${id} eliminado correctamente`);
    res.status(200).json({ msg: 'Eliminado correctamente', eliminado });
  } catch (error) {
    console.error(' Error al eliminar:', error);
    res.status(500).json({ msg: 'Error al eliminar', error });
  }
};
