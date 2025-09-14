// DataEntry.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { Plus, Home, AlertCircle } from 'lucide-react';

const DataEntry: React.FC = () => {
    const navigate = useNavigate();
    const { isConnected, isReconnecting } = useAccount();
    const [formData, setFormData] = useState({
        date: '',
        sleepHours: '',
        restingHR: '',
        dailySteps: '',
        notes: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    // Redirect to home if wallet is disconnected
    useEffect(() => {
        if (!isConnected && !isReconnecting) {
            console.log('Wallet not connected, redirecting to home...');
            navigate('/', { replace: true });
        }
    }, [isConnected, isReconnecting, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        // Clear any previous submit errors when user starts typing
        if (submitError) {
            setSubmitError(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isConnected) {
            setSubmitError('Wallet connection lost. Please reconnect.');
            return;
        }

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            // Validate form data
            if (!formData.date || !formData.sleepHours || !formData.restingHR || !formData.dailySteps) {
                throw new Error('Please fill in all required fields.');
            }

            // Validate numeric inputs
            const sleepHours = parseFloat(formData.sleepHours);
            const restingHR = parseInt(formData.restingHR);
            const dailySteps = parseInt(formData.dailySteps);

            if (sleepHours < 0 || sleepHours > 24) {
                throw new Error('Sleep hours must be between 0 and 24.');
            }
            if (restingHR < 30 || restingHR > 200) {
                throw new Error('Resting heart rate must be between 30 and 200 bpm.');
            }
            if (dailySteps < 0) {
                throw new Error('Daily steps cannot be negative.');
            }

            // Simulate API call - replace with actual blockchain/API logic
            await new Promise(resolve => setTimeout(resolve, 1000));

            console.log('New Health Entry:', {
                ...formData,
                sleepHours: sleepHours,
                restingHR: restingHR,
                dailySteps: dailySteps,
                timestamp: new Date().toISOString()
            });

            // Reset form after successful submission
            setFormData({
                date: '',
                sleepHours: '',
                restingHR: '',
                dailySteps: '',
                notes: ''
            });

            alert('Health entry added successfully!');

        } catch (error) {
            console.error('Error submitting health entry:', error);
            setSubmitError(error instanceof Error ? error.message : 'Failed to submit health entry. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBackToHome = () => {
        navigate('/', { replace: false });
    };

    // Don't render if wallet is not connected (will redirect anyway)
    if (!isConnected && !isReconnecting) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                >
                    <Home className="w-5 h-5 mr-2" />
                    Go Back Home
                </button>
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Data Entry</h1>
                    <p className="text-gray-600">Record your daily health metrics</p>
                </div>
                <div className="bg-purple-800/40 backdrop-blur-sm rounded-xl p-8 w-full max-w-md border border-purple-600/30">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <Plus className="w-6 h-6 text-green-400" />
                            Add Health Entry
                        </h2>
                        {isReconnecting && (
                            <div className="flex items-center space-x-1 text-yellow-300 text-sm">
                                <div className="animate-spin rounded-full h-3 w-3 border-b border-yellow-300"></div>
                                <span>Reconnecting...</span>
                            </div>
                        )}
                    </div>

                    {/* Error Display */}
                    {submitError && (
                        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg flex items-start space-x-2">
                            <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                                <p className="text-red-300 text-sm">{submitError}</p>
                                <button
                                    onClick={() => setSubmitError(null)}
                                    className="text-red-200 hover:text-white text-xs mt-1 underline"
                                >
                                    Dismiss
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Error Display */}
                {submitError && (
                    <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg flex items-start space-x-2">
                        <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                            <p className="text-red-300 text-sm">{submitError}</p>
                            <button
                                onClick={() => setSubmitError(null)}
                                className="text-red-200 hover:text-white text-xs mt-1 underline"
                            >
                                Dismiss
                            </button>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Date *</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full p-2 rounded-lg bg-purple-900/50 border border-purple-600/50 text-white focus:border-purple-400 focus:outline-none"
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Sleep Hours *</label>
                        <input
                            type="number"
                            name="sleepHours"
                            value={formData.sleepHours}
                            onChange={handleChange}
                            placeholder="e.g., 7.5"
                            step="0.1"
                            min="0"
                            max="24"
                            className="w-full p-2 rounded-lg bg-purple-900/50 border border-purple-600/50 text-white focus:border-purple-400 focus:outline-none"
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Resting Heart Rate (bpm) *</label>
                        <input
                            type="number"
                            name="restingHR"
                            value={formData.restingHR}
                            onChange={handleChange}
                            placeholder="e.g., 72"
                            min="30"
                            max="200"
                            className="w-full p-2 rounded-lg bg-purple-900/50 border border-purple-600/50 text-white focus:border-purple-400 focus:outline-none"
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Daily Steps *</label>
                        <input
                            type="number"
                            name="dailySteps"
                            value={formData.dailySteps}
                            onChange={handleChange}
                            placeholder="e.g., 8000"
                            min="0"
                            className="w-full p-2 rounded-lg bg-purple-900/50 border border-purple-600/50 text-white focus:border-purple-400 focus:outline-none"
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Notes</label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            placeholder="Optional notes..."
                            rows={3}
                            className="w-full p-2 rounded-lg bg-purple-900/50 border border-purple-600/50 text-white focus:border-purple-400 focus:outline-none resize-none"
                            disabled={isSubmitting}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || !isConnected}
                        className="w-full py-2 mt-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                <span>Adding Entry...</span>
                            </>
                        ) : (
                            <span>Add Entry</span>
                        )}
                    </button>
                </form>

                <button
                    onClick={handleBackToHome}
                    disabled={isSubmitting}
                    className="w-full py-2 mt-4 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                    <Home className="w-4 h-4" />
                    <span>Back to Dashboard</span>
                </button>

                <p className="text-xs text-gray-400 mt-4 text-center">
                    * Required fields
                </p>
            </div>
        </div>
    );
};

export default DataEntry;