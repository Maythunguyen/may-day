
import clientPromise from '@/lib/mongodb';
import { NextResponse }     from 'next/server';
import { ObjectId }         from 'mongodb';

const getCollection = async () => {
	const client = await clientPromise;
	return client.db('mayday').collection('journals');
};

export async function GET(request) {
	const { searchParams } = new URL(request.url);
	const userId = searchParams.get('userId');
	const col    = await getCollection();
	const data   = await col.find({ userId }).sort({ createdAt: -1 }).toArray();
	return NextResponse.json(data);
}

export async function POST(request) {
	const body      = await request.json();
	const col       = await getCollection();
	const entry     = { ...body, createdAt: new Date() };
	const { insertedId } = await col.insertOne(entry);
	return NextResponse.json({ ...entry, _id: insertedId }, { status: 201 });
}
export async function PUT(request) {
	const { _id, ...update } = await request.json();
	const col = await getCollection();
	await col.updateOne(
		{ _id: new ObjectId(_id) },
		{ $set: { ...update, updatedAt: new Date() } }
	);
	return NextResponse.json({ ok: true });
}
export async function DELETE(request) {
	const { searchParams } = new URL(request.url);
	const id  = searchParams.get('_id');
	const col = await getCollection();
	await col.deleteOne({ _id: new ObjectId(id) });
	return NextResponse.json({ ok: true });
}
