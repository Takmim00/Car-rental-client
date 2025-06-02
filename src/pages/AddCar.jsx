import axios from "axios";
import { useCallback, useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { authContext } from "../provider/AuthProvider";

const AddCar = () => {
  const navigate = useNavigate();
  const { user } = useContext(authContext);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setUploadedImages((prevImages) => [...prevImages, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleRemoveImage = (index) => {
    setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImageUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  const uploadImage = async (file) => {
    if (!file) return null;
    const imgData = new FormData();
    imgData.append("file", file);

    imgData.append("upload_preset", "Car_rental");
    imgData.append("cloud_name", "dlogratts");
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dlogratts/image/upload`,
      {
        method: "POST",
        body: imgData,
      }
    );

    const uploadedImageData = await res.json();
    const uploadedImageUrl = uploadedImageData.url;

    return uploadedImageUrl;
  };

  const handleAddCar = async (e) => {
    e.preventDefault();
    const form = e.target;
    const carModel = form.carModel.value;
    const dailyRentalPrice = form.dailyRentalPrice.value;
    const availability = form.availability.value;
    const vehicleRegNumber = form.vehicleRegNumber.value;
    const features = form.features.value;
    const description = form.description.value;
    const location = form.location.value;

    const uploadedUrls = await Promise.all(
      uploadedImages.map((file) => uploadImage(file))
    );
    setImageUrls(uploadedUrls);

    const addCar = {
      carModel,
      dailyRentalPrice,
      availability,
      vehicleRegNumber,
      features,
      description,
      images: uploadedUrls,
      location,
      bookingCount: 0,
      name: user?.displayName,
      email: user?.email,
      dateAdded: new Date().toISOString(),
      bookingStatus: "pending",
    };
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/add-car`,
        addCar
      );
      form.reset();
      toast.success("Data Added Successfully!!!");
      navigate("/myCar");
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div className="max-w-5xl mx-auto p-8 bg-red-50 rounded-xl shadow-2xl my-8">
      <h2 className="text-3xl font-bold text-center text-red-800 mb-8">
        Add a New Car
      </h2>

      <form onSubmit={handleAddCar} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Car Model */}
          <div>
            <label className="block text-sm font-medium text-red-800 mb-1">
              Car Model
            </label>
            <input
              type="text"
              name="carModel"
              className="mt-1 p-3 w-full border border-red-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 transition duration-200 ease-in-out"
              placeholder="Enter Car Model"
              required
            />
          </div>

          {/* Daily Rental Price */}
          <div>
            <label className="block text-sm font-medium text-red-800 mb-1">
              Daily Rental Price
            </label>
            <input
              type="number"
              name="dailyRentalPrice"
              className="mt-1 p-3 w-full border border-red-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 transition duration-200 ease-in-out"
              placeholder="Enter Daily Rental Price"
              required
            />
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-medium text-red-800 mb-1">
              Availability
            </label>
            <select
              name="availability"
              className="mt-1 p-3 w-full border border-red-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 transition duration-200 ease-in-out"
            >
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>

          {/* Vehicle Registration Number */}
          <div>
            <label className="block text-sm font-medium text-red-800 mb-1">
              Vehicle Registration Number
            </label>
            <input
              type="text"
              name="vehicleRegNumber"
              className="mt-1 p-3 w-full border border-red-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 transition duration-200 ease-in-out"
              placeholder="Enter Registration Number"
            />
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-red-800 mb-1">
              Features
            </label>
            <select
              name="features"
              className="mt-1 p-3 w-full border border-red-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 transition duration-200 ease-in-out"
            >
              <option value="GPS">GPS</option>
              <option value="AC">AC</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-red-800 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              className="mt-1 p-3 w-full border border-red-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 transition duration-200 ease-in-out"
              placeholder="Enter Location"
              required
            />
          </div>
        </div>

        <div>
          {/* Description */}
          <label className="block text-sm font-medium text-red-800 mb-1">
            Description
          </label>
          <textarea
            name="description"
            rows="4"
            className="mt-1 p-3 w-full border border-red-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 transition duration-200 ease-in-out"
            placeholder="Enter Description"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-red-800 mb-1">
            Images
          </label>
          <div
            {...getRootProps()}
            name="image"
            className="border-2 border-dashed border-red-300 rounded-lg p-6 bg-red-100 flex flex-col items-center justify-center cursor-pointer hover:border-red-500 transition duration-200 ease-in-out"
          >
            <input {...getInputProps()} />
            <div className="text-center">
              {isDragActive ? (
                <p className="text-red-700 font-semibold">
                  Drop the files here...
                </p>
              ) : (
                <>
                  <p className="text-red-600">
                    Drag 'n' drop some files here, or click to select files
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="mt-4">
            {uploadedImages.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {uploadedImages.map((file, index) => (
                  <div
                    key={index}
                    className="relative w-32 h-32 border border-red-300 rounded-lg overflow-hidden shadow-md"
                  >
                    <input
                      type="image"
                      name="files"
                      src={URL.createObjectURL(file)}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemoveImage(index);
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded-full text-sm"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>{/* Submit Button */}</div>
        <button
          type="submit"
          className="w-full p-4 bg-red-700 text-white font-bold text-lg rounded-md hover:bg-red-800 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Add Car
        </button>
      </form>
    </div>
  );
};

export default AddCar;
