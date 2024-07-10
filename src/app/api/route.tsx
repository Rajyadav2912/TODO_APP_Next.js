import { NextResponse } from "next/server";
// import { connectDB } from "../../lib/config/db";
import TodoModel from "../../lib/models/Todomodel";
import connectDB from "@/lib/config/db";

const loadDB = async () => {
  await connectDB();
};

loadDB();

export async function GET($req: any, $res: any) {
  const todos = await TodoModel.find({});

  return NextResponse.json({
    success: true,
    data: todos,
    msg: "get method hit",
  });
}

export async function POST($req: any) {
  const { title, description } = await $req.json();

  if (!title || !description) {
    return NextResponse.json({
      msg: "Title and Description are required",
    }); // Bad Request status code
  }

  await TodoModel.create({
    title,
    description,
  });

  return NextResponse.json({ msg: "TODO Created" });
}

export async function DELETE($req: any) {
  const mongoId = await $req.nextUrl.searchParams.get("mongoId");

  await TodoModel.findByIdAndDelete(mongoId);

  return NextResponse.json({ msg: "TODO Delete Successfull" });
}

export async function PUT($req: any) {
  const mongoId = await $req.nextUrl.searchParams.get("mongoId");

  await TodoModel.findByIdAndUpdate(mongoId, {
    $set: {
      isCompleted: true,
    },
  });

  return NextResponse.json({ msg: "TODO Update Successfull" });
}
