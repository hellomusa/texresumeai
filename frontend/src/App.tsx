import { FileText, FileUp, Loader2 } from "lucide-react";
import type React from "react";
import { useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const HomePage: React.FC = () => {
	const [file, setFile] = useState<File | null>(null);
	const [message, setMessage] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [downloadLink, setDownloadLink] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleCreateNew = () => {
		// Implement navigation or action for creating a new resume
		console.log("Create new resume");
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0];
		if (selectedFile) {
			if (selectedFile.type === "application/pdf") {
				setFile(selectedFile);
				setError("");
			} else {
				setFile(null);
				setError("Please select a PDF file.");
			}
		}
	};

	const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!file) {
			setError("Please select a file to upload.");
			return;
		}

		setIsLoading(true);
		setError("");
		setMessage("");
		setDownloadLink("");

		const formData = new FormData();
		formData.append("file", file);

		try {
			const response = await fetch("http://localhost:5000/upload", {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();

			if (data.error) {
				setError(data.error);
			} else {
				setMessage(data.message);
				setDownloadLink(`http://localhost:5000${data.download_link}`);
			}
		} catch (error) {
			console.error("Error:", error);
			setError("An error occurred. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen">
			<Navbar />
			<div className=" bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col items-center justify-center px-4 pt-8 pb-12">
				<header className="text-center mb-8">
					<h1 className="text-4xl font-bold text-gray-800 mb-2">
						LaTeX Resume Builder
					</h1>
					<p className="text-xl text-gray-600">
						Create professional resumes with ease
					</p>
				</header>

				<div className="grid gap-6 md:grid-cols-2 max-w-4xl w-full">
					<div className="bg-white rounded-lg shadow-md overflow-hidden">
						<div className="p-6">
							<div className="flex items-center justify-between mb-4">
								<h2 className="text-xl font-semibold text-gray-800">
									Start from Scratch
								</h2>
								<FileText
									className="h-6 w-6 text-blue-500"
									aria-hidden="true"
								/>
							</div>
							<p className="text-gray-600 mb-6">
								Create a new resume using our LaTeX templates
							</p>
							<button
								onClick={handleCreateNew}
								className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
								aria-label="Create New Resume"
							>
								Create New Resume
							</button>
						</div>
					</div>
					<div className="bg-white rounded-lg shadow-md overflow-hidden">
						<div className="p-6">
							<div className="flex items-center justify-between mb-4">
								<h2 className="text-xl font-semibold text-gray-800">
									Upload Existing Resume
								</h2>
								<FileUp className="h-6 w-6 text-green-500" aria-hidden="true" />
							</div>
							<p className="text-gray-600 mb-6">
								Upload and edit your existing PDF resume
							</p>
							<form onSubmit={handleUpload}>
								<label
									htmlFor="file-upload"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									Choose PDF file
								</label>
								<input
									id="file-upload"
									name="file-upload"
									type="file"
									onChange={handleFileChange}
									accept=".pdf"
									className="w-full mb-4 text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-green-50 file:text-green-700
                    hover:file:bg-green-100"
								/>
								<button
									type="submit"
									disabled={!file || isLoading}
									className="w-full border border-green-500 text-green-500 py-2 px-4 rounded hover:bg-green-50 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
									aria-label="Upload and Generate Resume"
								>
									{isLoading ? (
										<span className="flex items-center justify-center">
											<Loader2
												className="animate-spin h-5 w-5 mr-2"
												aria-hidden="true"
											/>
											Processing...
										</span>
									) : (
										"Upload and Generate"
									)}
								</button>
							</form>
						</div>
					</div>
				</div>

				{(message || error || downloadLink) && (
					<div className="mt-6 p-4 bg-white rounded-lg shadow-md max-w-md w-full">
						{message && (
							<div className="text-center text-green-600 mb-2">{message}</div>
						)}
						{error && (
							<div className="text-center text-red-600 mb-2">{error}</div>
						)}
						{downloadLink && (
							<div className="text-center">
								<a
									href={downloadLink}
									className="text-blue-500 hover:text-blue-600 underline"
									target="_blank"
									rel="noopener noreferrer"
								>
									Download Generated Resume
								</a>
							</div>
						)}
					</div>
				)}
			</div>
			<Footer />
		</div>
	);
};

export default HomePage;
