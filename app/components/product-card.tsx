// ProductCard.tsx

import React from "react";

export interface Product {
  title?: string;
  url?: string;
  image_url?: string;
  last_modified?: string;
  change_frequency?: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md transition-transform transform hover:scale-105">
      {product.image_url && (
        <img
          src={product.image_url}
          alt={product.title || "Product Image"}
          className="mb-4 h-48 w-full object-cover rounded-lg"
        />
      )}

      <div className="mb-4 flex items-center justify-between gap-4">
        <span className="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
          Up to 35% off
        </span>

        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            data-tooltip-target="tooltip-quick-look"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Quick look</span>
            {/* SVG for Quick Look */}
          </button>

          <button
            type="button"
            data-tooltip-target="tooltip-add-to-favorites"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Add to Favorites</span>
            {/* SVG for Add to Favorites */}
          </button>
        </div>
      </div>

      <a
        target="_blank"
        href={product.url}
        className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
      >
        {product.title || "Product Title"}
      </a>

      <div className="mt-2 flex items-center gap-2">
        <div className="flex items-center">
          {/* Render star ratings dynamically or with a placeholder */}
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            5.0
          </p>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            (455)
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">
          {/* Display price dynamically or with a placeholder */}
          $1,699
        </p>

        <button
          type="button"
          className="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
