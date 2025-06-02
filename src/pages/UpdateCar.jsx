import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCar = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [uploadedImages, setUploadedImages] = useState([]);
  const [features, setFeatures] = useState("");
  const [availability, setAvailability] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [car, setCar] = useState({});

  const onDrop = useCallback((acceptedFiles) => {
    setUploadedImages((prevImages) => [...prevImages, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleRemoveImage = (index, type) => {
    if (type === "url") {
      setImageUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
    } else if (type === "file") {
      setUploadedImages((prevImages) =>
        prevImages.filter((_, i) => i !== index)
      );
    }
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

  useEffect(() => {
    fetchJobData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchJobData = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/car/${id}`
    );
    setCar(data);
    setImageUrls(data.images || []);
  };

  useEffect(() => {
    if (car.availability) {
      setAvailability(car.availability);
    }
  }, [car]);

  const handleAvailabilityChange = (e) => {
    setAvailability(e.target.value);
  };

  useEffect(() => {
    if (car.features) {
      setFeatures(car.features);
    }
  }, [car]);

  const handleFeaturesChange = (e) => {
    setFeatures(e.target.value);
  };

  const handleUpdateCar = async (e) => {
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

    const updatedImageUrls = [...imageUrls, ...uploadedUrls];

    const updateCar = {
      carModel,
      dailyRentalPrice,
      availability,
      vehicleRegNumber,
      features,
      description,
      images: updatedImageUrls,
      location,
      bookingCount: 0,
      dateAdded: new Date().toISOString(),
      bookingStatus: "pending",
    };

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/updateCars/${id}`,
        updateCar
      );
      form.reset();
      setImageUrls(updatedImageUrls);
      setUploadedImages([]);
      toast.success("Data Updated Successfully!!!");
      navigate("/myCar");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-red-50 rounded-lg shadow-xl my-8">
      <h2 className="text-3xl font-bold text-red-800 mb-8 text-center">
        Update Car Information
      </h2>

      <form
        onSubmit={handleUpdateCar}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="col-span-2 md:col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Car Model
          </label>
          <input
            type="text"
            name="carModel"
            defaultValue={car.carModel}
            className="mt-1 p-3 w-full border border-red-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter Car Model"
            required
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Daily Rental Price
          </label>
          <input
            type="number"
            defaultValue={car.dailyRentalPrice}
            name="dailyRentalPrice"
            className="mt-1 p-3 w-full border border-red-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter Daily Rental Price"
            required
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Availability
          </label>
          <select
            name="availability"
            value={availability}
            onChange={handleAvailabilityChange}
            className="mt-1 p-3 w-full border border-red-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>

        <div className="col-span-2 md:col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Vehicle Registration Number
          </label>
          <input
            type="text"
            defaultValue={car.vehicleRegNumber}
            name="vehicleRegNumber"
            className="mt-1 p-3 w-full border border-red-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter Registration Number"
            required
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Features
          </label>
          <select
            name="features"
            value={features}
            onChange={handleFeaturesChange}
            className="mt-1 p-3 w-full border border-red-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="GPS">GPS</option>
            <option value="AC">AC</option>
          </select>
        </div>
        <div className="col-span-2 md:col-span-1">
          <label className="block text-sm font-medium  text-gray-700">
            Location
          </label>
          <input
            type="text"
            defaultValue={car.location}
            name="location"
            className="mt-1 p-3 w-full border border-red-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter Location"
            required
          />
        </div>

        <div className="col-span-2 md:col-span-2">
          <label className="block text-sm font-medium  text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            defaultValue={car.description}
            className="mt-1 p-3 w-full border border-red-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter Description"
          />
        </div>

        <div className="col-span-2 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Images
          </label>
          <div
            {...getRootProps()}
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
            <div className="flex flex-wrap gap-4">
              {imageUrls.map((url, index) => (
                <div
                  key={`image-url-${index}`}
                  className="relative w-32 h-32 border rounded-lg overflow-hidden"
                >
                  <img
                    src={url}
                    alt="Uploaded"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index, "url")}
                    className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded-full text-sm"
                  >
                    ×
                  </button>
                </div>
              ))}

              {uploadedImages.map((file, index) => (
                <div
                  key={`uploaded-image-${index}`}
                  className="relative w-32 h-32 border rounded-lg overflow-hidden"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index, "file")}
                    className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded-full text-sm"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        

        <button
          type="submit"
          className="w-full p-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-500 col-span-2"
        >
          Update Car
        </button>
      </form>
    </div>
  );
};

export default UpdateCar;
