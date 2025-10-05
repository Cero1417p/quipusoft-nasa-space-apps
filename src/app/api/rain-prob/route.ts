// src/app/api/rain-prob/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Obtener los parámetros de la query
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const day = searchParams.get('day');

  // Validar parámetros
  if (!lat || !lon || !day) {
    return NextResponse.json(
      { error: 'Faltan parámetros: lat, lon, day' },
      { status: 400 }
    );
  }

  // Validar que sean números
  const latNum = parseFloat(lat);
  const lonNum = parseFloat(lon);
  if (isNaN(latNum) || isNaN(lonNum)) {
    return NextResponse.json(
      { error: 'lat y lon deben ser números válidos' },
      { status: 400 }
    );
  }

  // Validar formato de fecha (opcional, básico)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) {
    return NextResponse.json(
      { error: 'El formato de "day" debe ser YYYY-MM-DD' },
      { status: 400 }
    );
  }

  // Construir la URL de la API externa
  const externalUrl = `https://quipusoft-nasa-space-apps-backend.onrender.com/api/v1/rain-prob?lat=${latNum}&lon=${lonNum}&day=${day}`;

  try {
    const response = await fetch(externalUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      // Opcional: timeout o retries en producción
    });

    if (!response.ok) {
      console.error('Error en API externa:', response.status, await response.text());
      return NextResponse.json(
        { error: 'Error al obtener datos de la API externa' },
        { status: 502 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error al llamar a la API externa:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}