import { useState } from "react";
import { useForm } from "react-hook-form";
import { createProduct } from "../api/products";

export default function CreateProductForm({ onSuccess }) {
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      price: "",
      description: "",
      category: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitError("");
      setSuccessMessage("");

      const product = await createProduct(data);

      console.log("Created product:", product);

     setSuccessMessage(
  `Product "${product.title}" was created successfully.`
);

reset();

if (onSuccess) {
  setTimeout(() => {
    onSuccess();
  }, 1000);
}
    } catch (error) {
      console.error(error);

      setSubmitError(
        "Unable to create the product. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      {/* Product Name */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-semibold text-slate-700"
        >
          Product Name
        </label>

        <input
          id="title"
          type="text"
          {...register("title", {
            required: "Product name is required",
            minLength: {
              value: 3,
              message:
                "Product name must be at least 3 characters",
            },
          })}
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-600"
          placeholder="Enter product name"
        />

        {errors.title && (
          <p className="mt-1 text-sm text-red-600">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Price */}
      <div>
        <label
          htmlFor="price"
          className="block text-sm font-semibold text-slate-700"
        >
          Price
        </label>

        <input
          id="price"
          type="number"
          step="0.01"
          {...register("price", {
            required: "Price is required",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Price must be greater than 0",
            },
          })}
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-600"
          placeholder="Enter price"
        />

        {errors.price && (
          <p className="mt-1 text-sm text-red-600">
            {errors.price.message}
          </p>
        )}
      </div>

      {/* Category */}
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-semibold text-slate-700"
        >
          Category
        </label>

        <input
          id="category"
          type="text"
          {...register("category", {
            required: "Category is required",
          })}
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-600"
          placeholder="Enter category"
        />

        {errors.category && (
          <p className="mt-1 text-sm text-red-600">
            {errors.category.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-semibold text-slate-700"
        >
          Description
        </label>

        <textarea
          id="description"
          rows="5"
          {...register("description", {
            required: "Description is required",
            minLength: {
              value: 10,
              message:
                "Description must be at least 10 characters",
            },
          })}
          className="mt-2 w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-600"
          placeholder="Enter product description"
        />

        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Error */}
      {submitError && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
          {submitError}
        </div>
      )}

      {/* Success */}
      {successMessage && (
        <div className="rounded-lg bg-green-50 p-4 text-sm text-green-700">
          {successMessage}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Creating..." : "Add Product"}
      </button>
    </form>
  );
}