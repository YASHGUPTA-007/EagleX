import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, projectIdea, companyName, website } = body;

    // Validate required fields
    if (!name || !email || !phone || !projectIdea) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Save to Firestore - UPDATED COLLECTION NAME
    const luckyDrawRef = collection(db, 'lucky_draw');
    const docRef = await addDoc(luckyDrawRef, {
      name,
      email,
      phone,
      projectIdea,
      companyName: companyName || '',
      website: website || '',
      createdAt: serverTimestamp(),
      status: 'pending',
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Lucky draw entry submitted successfully',
        id: docRef.id 
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Error submitting lucky draw entry:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to submit entry. Please try again.' },
      { status: 500 }
    );
  }
}

// Add OPTIONS for CORS if needed
export async function OPTIONS(request: Request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}