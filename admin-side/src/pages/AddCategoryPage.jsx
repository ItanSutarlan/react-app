import CategoryForm from "../components/CategoryForm";

export default function AddCategoryPage() {

  return (
    <div className="text-xs lg:block px-5 mb-20">
      <h1 className="font-bold text-3xl text-center">Add New Category</h1>
      <CategoryForm />
    </div>
  )
}