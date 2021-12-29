import { useState, useEffect } from 'react';

export function useFetchPost(url) {
	const [body, setBody] = useState({});
	const [data, setData] = useState({});
	const [isLoading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		const bodyJson = JSON.stringify(body);
		if (!url || bodyJson === '{}') return;
		console.log(bodyJson);
		setLoading(true);
		async function fetchData() {
			try {
				const response = await fetch(url, {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					bodyJson,
				});
				const data = await response.json();
				setData(data);
			} catch (err) {
				console.log(err);
				setError(true);
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, [url, body]);
	return { isLoading, data, error, setBody };
}

export function useFetch(url) {
	const [data, setData] = useState({});
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
				console.log(err);
				setError(true);
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, [url]);
	return { isLoading, data, error };
}
