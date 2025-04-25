import connectToDatabase from "@/lib/mongodb";
import schema from "../MODELS/schema";
import { ObjectId } from "mongodb"; // Import MongoDB ObjectId for validation

export async function POST(request: Request) {
  const { name, email, phone, message } = await request.json();
  console.log(name, email, phone, message);

  try {
    await connectToDatabase(); // Ensure MongoDB connection is established

    const newEnquiry = new schema({
      name,
      email,
      phone,
      message,
    });

    await newEnquiry.save(); // Wait for insertion to complete

    return new Response(
      JSON.stringify({
        message: "Enquiry Inserted Successfully",
        status: 200,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({
        message: "Error inserting enquiry",
        error: err,
      }),
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase(); // Ensure MongoDB connection is established

    const enquiries = await schema.find();

    return new Response(
      JSON.stringify({
        message: "Enquiry Get Successfully",
        status: 200,
        enquiries,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({
        message: "Error fetching enquiries",
        error: err,
      }),
      { status: 500 }
    );
  }
}


export async function PUT(request: Request) {
  const { name, email, phone, message ,_id} = await request.json();


  // Validate if id is a valid MongoDB ObjectId
  if (!ObjectId.isValid(_id)) {
    return new Response(
      JSON.stringify({
        message: "Invalid MongoDB ID",
      }),
      { status: 400 }
    );
  }

  // Prepare update object, only include fields that are provided
  const updateObj: any = {};
  if (name) updateObj.name = name;
  if (email) updateObj.email = email;
  if (phone) updateObj.phone = phone;
  if (message) updateObj.message = message;

  if (Object.keys(updateObj).length === 0) {
    return new Response(
      JSON.stringify({
        message: "No valid fields to update",
      }),
      { status: 400 }
    );
  }

  try {
    await connectToDatabase(); // Ensure MongoDB connection is established

    // Perform the update operation using the MongoDB ObjectId
    const updatedEnquiry = await schema.updateOne(
      { _id: new ObjectId(_id) }, // Use ObjectId for MongoDB
      { $set: updateObj } // Use $set to update specific fields
    );

    if (updatedEnquiry.modifiedCount === 0) {
      return new Response(
        JSON.stringify({
          message: "No matching enquiry found or no changes made",
        }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Enquiry updated successfully",
        status: 200,
        updatedEnquiry,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({
        message: "Error updating enquiry",
        error: err,
      }),
      { status: 500 }
    );
  }
}



// DELETE Function
export async function DELETE(request: Request) {
  const {_id} = await request.json();


  // Validate if id is a valid MongoDB ObjectId
  if (!ObjectId.isValid(_id)) {
    return new Response(
      JSON.stringify({
        message: "Invalid MongoDB ID",
      }),
      { status: 400 }
    );
  }

  try {
    await connectToDatabase(); // Ensure MongoDB connection is established

    // Perform the delete operation using the MongoDB ObjectId
    const deletedEnquiry = await schema.deleteOne({ _id: new ObjectId(_id) });

    if (deletedEnquiry.deletedCount === 0) {
      return new Response(
        JSON.stringify({
          message: "No matching enquiry found to delete",
        }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Enquiry Deleted Successfully",
        status: 200,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({
        message: "Error deleting enquiry",
        error: err,
      }),
      { status: 500 }
    );
  }
}
