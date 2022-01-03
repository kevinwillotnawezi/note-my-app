import { useState, useEffect } from 'react';

export function useFetch(url) {
	const [data, setData] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		if (!url) return;
		setLoading(true);
		async function fetchData() {
			try {
				const response = await fetch(url);
				const data = await response.json();
				setData(data);
			} catch (err) {
				console.err(err);
				setError(true);
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, [url]);
	return { isLoading, data, error, setData };
}

export function usePost(url) {
	const [data, setData] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [body, setBody] = useState();

	useEffect(() => {
		if (!url) return;
		if (!body) return;
		setLoading(true);
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		};
		async function fetchData() {
			try {
				const response = await fetch(url, requestOptions);
				const data = await response.json();
				setData(data);
			} catch (err) {
				setError(true);
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, [body, url]);

	return { isLoading, data, error, setBody };
}
