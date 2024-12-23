import axios from "axios";
import { useCallback, useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import { authContext } from "../provider/AuthProvider";

const AddCar = () => {
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
    console.log(file);
    imgData.append("upload_preset", "Car_rental");
    imgData.append("cloud_name", "dlogratts");
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dlogratts/image/upload`,
      {
        method: "POST",
        body: imgData,
      }
    );
    console.log(res);
    const uploadedImageData = await res.json();
    const uploadedImageUrl = uploadedImageData.url;

    console.log(uploadedImageUrl);
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
      user: user?.displayName, 
      dateAdded: new Date().toISOString(), 
      bookingStatus: "pending", 
    };
    console.log(addCar);

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/add-car`,
      addCar
    );
    console.log(data);
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Add a New Car</h2>

      <form onSubmit={handleAddCar} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Car Model
          </label>
          <input
            type="text"
            name="carModel"
            className="mt-1 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Car Model"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Daily Rental Price
          </label>
          <input
            type="number"
            name="dailyRentalPrice"
            className="mt-1 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Daily Rental Price"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Availability
          </label>

          <select
            name="availability"
            className="mt-1 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Vehicle Registration Number
          </label>
          <input
            type="text"
            name="vehicleRegNumber"
            className="mt-1 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Registration Number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Features
          </label>
          <select
            name="features"
            className="mt-1 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="GPS">GPS</option>
            <option value="AC">AC</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            className="mt-1 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Images
          </label>
          <div
            {...getRootProps()}
            name="image"
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500"
          >
            <input {...getInputProps()} />
            <div className="text-center">
              {isDragActive ? (
                <p className="text-gray-700">Drop the files here...</p>
              ) : (
                <>
                  <p className="text-gray-500">
                    Drag 'n' drop some files here, or click to select files
                  </p>
                  <p className="text-sm text-gray-400">
                    Supported files: JPG, PNG, GIF
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
                    className="relative w-32 h-32 border rounded-lg overflow-hidden"
                  >
                    <input
                      type="image"
                      name="files"
                      src={URL.createObjectURL(file)}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
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

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            name="location"
            className="mt-1 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Location"
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Car
        </button>
      </form>
    </div>
  );
};

export default AddCar;
